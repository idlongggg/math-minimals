'use client';

import type { IconButtonProps } from '@mui/material/IconButton';

import { m } from 'framer-motion';
import { usePopover } from 'minimal-shared/hooks';
import { useCallback, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { transitionTap, varHover, varTap } from 'src/components/animate';
import { CustomPopover } from 'src/components/custom-popover';
import { FlagIcon } from 'src/components/flag-icon';

// ----------------------------------------------------------------------

export type LanguagePopoverProps = IconButtonProps & {
  data?: {
    value: string;
    label: string;
    countryCode: string;
  }[];
};

export function LanguagePopover({ data = [], sx, ...other }: LanguagePopoverProps) {
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const [locale, setLocale] = useState<string>(data.find(lang => lang.value === 'vi')?.value || data[0]?.value || 'vi');

  const currentLang = data.find((lang) => lang.value === locale) || data.find(lang => lang.value === 'vi') || data[0];

  const handleChangeLang = useCallback(
    (newLang: string) => {
      setLocale(newLang);
      onClose();
    },
    [onClose]
  );

  const renderMenuList = () => (
    <CustomPopover open={open} anchorEl={anchorEl} onClose={onClose}>
      <MenuList sx={{ width: 160, minHeight: 72 }}>
        {data?.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang?.value}
            onClick={() => handleChangeLang(option.value)}
          >
            <FlagIcon code={option.countryCode} />
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Languages button"
        onClick={onOpen}
        sx={[
          (theme) => ({
            p: 0,
            width: 40,
            height: 40,
            ...(open && { bgcolor: theme.vars.palette.action.selected }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <FlagIcon code={currentLang?.countryCode} />
      </IconButton>

      {renderMenuList()}
    </>
  );
}
