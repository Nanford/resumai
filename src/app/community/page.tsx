'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import Link from 'next/link';
import CommunitySection from '../components/CommunitySection';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function CommunityPage() {
  const { t } = useTranslation();

  // 初始化i18n
  useEffect(() => {
    // 确保i18n已初始化
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                ResuMAI
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                <HomeIcon className="h-5 w-5 mr-1" />
                {t('home.back')}
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {t('chat.title')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('community.title')}
          </h1>
          <CommunitySection />
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">© 2023 ResuMAI. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 