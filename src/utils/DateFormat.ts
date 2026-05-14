// ============================================================
// DATE / TIME UTILITY FUNCTIONS
// All functions treat input as UTC to avoid timezone issues
// across multiple countries/devices
// ============================================================

/**
 * Normalizes an ISO string to ensure it's treated as UTC.
 * Appends 'Z' if no timezone info is present.
 */
const toUTCDate = (isoString: string): Date => {
  const normalized =
    isoString.endsWith('Z') || isoString.includes('+')
      ? isoString
      : `${isoString}Z`;
  return new Date(normalized);
};

// ------------------------------------------------------------

/**
 * Formats an ISO string to DD-MM-YYYY using UTC values.
 * e.g. "2024-01-05T10:30:00.000Z" → "05-01-2024"
 */
export const formatToDMY = (isoString: string): string => {
  if (!isoString) return '-';

  const date = toUTCDate(isoString);
  if (isNaN(date.getTime())) return '-';

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

// ------------------------------------------------------------

/**
 * Formats an ISO string to 12-hour time (hh:mm AM/PM) using UTC values.
 * e.g. "2024-01-05T14:30:00.000Z" → "2:30 PM"
 */
export const formatTo12HourTime = (isoString: string): string => {
  if (!isoString) return '-';

  const date = toUTCDate(isoString);
  if (isNaN(date.getTime())) return '-';

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
};

// ------------------------------------------------------------

/**
 * Returns a human-readable relative time string.
 * e.g. "2024-01-05T10:30:00.000Z" → "3 days ago"
 * Timezone-independent (works correctly for all countries).
 */
export const getTimeAgo = (dateString: string): string => {
  if (!dateString) return 'Unknown date';

  const date = toUTCDate(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Future date guard (device clock skew)
  if (diff < 0) return 'just now';

  if (diff < 60) {
    if (diff <= 1) return 'just now';
    return `${diff} secs ago`;
  }
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} min${mins !== 1 ? 's' : ''} ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
  }
  if (diff < 2592000) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
  if (diff < 31536000) {
    const months = Math.floor(diff / 2592000);
    return `${months} mo${months !== 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(diff / 31536000);
  return `${years} yr${years !== 1 ? 's' : ''} ago`;
};

// ------------------------------------------------------------

/**
 * Formats an ISO string to full date + 12-hour time using UTC values.
 * e.g. "2024-01-05T14:30:00.000Z" → "05-01-2024, 2:30 PM"
 */
export const formatToFull12HourDateTime = (isoString: string): string => {
  if (!isoString) return '-';

  const date = toUTCDate(isoString);
  if (isNaN(date.getTime())) return '-';

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
};

// ------------------------------------------------------------

/**
 * Returns expiry text for a ticket (expires 15 mins after createdAt).
 * Uses UTC diff so device timezone doesn't affect result.
 * e.g. → "Expires in 7 minutes" or "Ticket expired"
 */
export const getTicketExpiryText = (createdAt: Date | string): string => {
  if (!createdAt) return 'Invalid time';

  const createdTime = new Date(createdAt);
  if (isNaN(createdTime.getTime())) return 'Invalid time';

  const now = new Date();
  const diffMins = Math.floor((now.getTime() - createdTime.getTime()) / 60000);

  if (diffMins >= 15) return 'Ticket expired';

  const remaining = 15 - diffMins;
  return `Expires in ${remaining} minute${remaining !== 1 ? 's' : ''}`;
};

// ------------------------------------------------------------

/**
 * Returns true if ticket has expired (older than 15 mins).
 * Uses UTC diff so device timezone doesn't affect result.
 */
export const isTicketExpired = (createdAt: Date | string): boolean => {
  if (!createdAt) return true;

  const createdTime = new Date(createdAt);
  if (isNaN(createdTime.getTime())) return true;

  const now = new Date();
  const diffMins = Math.floor((now.getTime() - createdTime.getTime()) / 60000);

  return diffMins >= 15;
};