'use client';

import { ReactNode, useEffect } from 'react';
import i18n from './i18n';

export default function Providers({ children }: { children: ReactNode }) {
  // 确保i18n已初始化
  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return <>{children}</>;
} 