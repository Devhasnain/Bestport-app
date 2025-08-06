import { View, DimensionValue } from 'react-native';
import Typography from '@components/ui/Typography';
import { Button, Dialog } from '@rneui/themed';
import React, { memo } from 'react';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


type Props = {
  loading?: boolean;
  title: string;
  description?: string;
  isOpen: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
  width?: DimensionValue | undefined;
  cancelTitle?:string;
  confirmTitle?:string;
};

const ConfirmationModal = ({
  loading,
  title,
  description,
  isOpen,
  onCancel,
  onConfirm,
  width,
  cancelTitle="Cancel",
  confirmTitle="Confirm"
}: Props) => {
  return (
    <Dialog
    animationType="fade"
      isVisible={isOpen}
      onBackdropPress={onCancel}
      statusBarTranslucent
      overlayStyle={{
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: width ?? '80%',
      }}>
      <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <Typography fontFamily={fonts.poppinsMedium}>{title}</Typography>

        {description && (
          <Typography fontFamily={fonts.poppinsRegular} fontSize={14}>
            {description}
          </Typography>
        )}
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 10,
        }}>
        {onCancel && <Button
          onPress={onCancel}
          title={cancelTitle}
          buttonStyle={{
            borderWidth: 1.2,
            borderColor: colors.inputplaceholder,
            borderRadius: 12,
            backgroundColor: 'transparent',
            paddingHorizontal: 13,
          }}
          titleStyle={{
            color: colors.primaryText,
            fontSize: 13,
            fontFamily: fonts.poppinsRegular,
            lineHeight: 16,
          }}
        />}
        <Button
          onPress={onConfirm}
          disabled={loading}
          loading={loading}
          title={confirmTitle}
          disabledStyle={{borderColor:"white",backgroundColor:colors.btnDisabled}}
          buttonStyle={{
            borderWidth: 1.2,
            borderColor: colors.btnPrimary,
            borderRadius: 12,
            backgroundColor: colors.btnPrimary,
            paddingHorizontal: 13,
          }}
          titleStyle={{
            color: colors.white,
            fontSize: 13,
            fontFamily: fonts.poppinsRegular,
            lineHeight: 16,
          }}
        />
      </View>
    </Dialog>
  );
};

export default memo(ConfirmationModal);
