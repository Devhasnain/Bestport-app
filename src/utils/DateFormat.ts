export const formatToDMY = (isoString:string) => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day <10 ? `0${day}`: day}-${month <10 ? `0${month}`:month}-${year}`;
};

export const formatTo12HourTime = (isoString:string) => {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours ? hours : '-'}:${paddedMinutes ? paddedMinutes : '-'} ${
    ampm ? ampm : '-'
  }`;
};

export const getTimeAgo = (dateString:string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((Number(now) - Number(date)) / 1000);

  if (diff < 60) {
    if (diff < 1) return 'just now';
    if (diff === 1) return '1 sec ago';
    if (diff < 60) return `${diff} secs ago`;
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
  return `${years} y${years !== 1 ? 's' : ''} ago`;
};


export const formatToFull12HourDateTime = (isoString:string) => {
  if (!isoString) return '-';

  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
};