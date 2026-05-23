import type { FC, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ChevronRightIcon } from 'lucide-react-native';
import { colors } from '../constants/colors';

type Variant = 'primary' | 'secondary' | 'admin';

export type RowButtonProps = {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  description?: string;
  variant?: Variant;
};

const base = StyleSheet.create({
  buttonClientContainer: {
    width: '90%',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 20,
    minHeight: 130,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  iconTile: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonClientTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 16,
    paddingRight: 8,
  },
  buttonClientText: {
    fontSize: 17,
    fontWeight: '700',
    flexShrink: 1,
  },
  buttonClientDescription: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 4,
    lineHeight: 18,
    flexShrink: 1,
  },
  chevronWrap: {
    flexShrink: 0,
  },
});

const variants = {
  primary: StyleSheet.create({
    buttonClientContainer: {
      backgroundColor: colors.appPurple,
    },
    iconTile: {
      backgroundColor: colors.iconTilePrimary,
    },
    buttonClientText: {
      color: colors.white,
    },
    buttonClientDescription: {
      color: 'rgba(255,255,255,0.78)',
    },
  }),
  secondary: StyleSheet.create({
    buttonClientContainer: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.borderSubtle,
      ...Platform.select({
        ios: {
          shadowColor: '#1c1530',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    iconTile: {
      backgroundColor: colors.iconTileSecondary,
    },
    buttonClientText: {
      color: colors.textPrimary,
    },
    buttonClientDescription: {
      color: colors.textSecondary,
    },
  }),
  admin: StyleSheet.create({
    buttonClientContainer: {
      backgroundColor: '#111827',
      borderWidth: 1,
      borderColor: '#374151',
    },
    iconTile: {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    buttonClientText: {
      color: colors.white,
    },
    buttonClientDescription: {
      color: 'rgba(255,255,255,0.5)',
    },
  }),
} as const;

const chevronColor: Record<Variant, string> = {
  primary: colors.white,
  secondary: colors.textSecondary,
  admin: 'rgba(255,255,255,0.3)',
};

const RowButton: FC<RowButtonProps> = ({
  title,
  onPress,
  icon,
  description,
  variant = 'primary',
}) => {
  const v = variants[variant];
  const accessibilityLabel = description ? `${title}. ${description}` : title;

  return (
    <TouchableOpacity
      style={[base.buttonClientContainer, v.buttonClientContainer]}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View style={base.rowInner}>
        {icon != null ? (
          <View style={[base.iconTile, v.iconTile]}>{icon}</View>
        ) : null}
        <View
          style={[
            base.buttonClientTextContainer,
            icon == null && { marginLeft: 0 },
          ]}
        >
          <Text style={[base.buttonClientText, v.buttonClientText]}>
            {title}
          </Text>
          {description != null ? (
            <Text style={[base.buttonClientDescription, v.buttonClientDescription]}>
              {description}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={base.chevronWrap}>
        <ChevronRightIcon size={22} color={chevronColor[variant]} strokeWidth={2} />
      </View>
    </TouchableOpacity>
  );
};

export default RowButton;
