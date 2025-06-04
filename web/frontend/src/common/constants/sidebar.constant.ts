import type { ComponentType, SVGProps } from 'react';

import IconArchive from '@comp/icons/IconArchive';
import IconArchiveAssistant from '@comp/icons/IconArchiveAssistant';
import IconCompetitiveAssistant from '@comp/icons/IconCompetitiveAssistant';
import IconDataManagement from '@comp/icons/IconDataManagement';
import IconHome from '@comp/icons/IconHome';

export interface SidebarNavItem {
  id: number;
  title: string;
  url?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children?: SidebarNavItem[]; // 재귀 타입
}

export const NAV_LIST = [
  { id: 1, title: '홈(대시보드)', url: '/', Icon: IconHome },
  {
    id: 2,
    title: 'AI 아카이브 어시스턴트',
    url: '/archive-assistant',
    Icon: IconArchiveAssistant,
  },
  {
    id: 3,
    title: 'AI 경쟁그룹 어시스턴트',
    url: '/competitive-assistant',
    Icon: IconCompetitiveAssistant,
  },
  { id: 4, title: '아카이브', url: '/archive', Icon: IconArchive },
  {
    id: 5,
    title: '관리자 자료 관리',
    url: '/management',
    Icon: IconDataManagement,
    children: [
      { id: 6, title: '파일 업로드', url: '/management/file-upload' },
      { id: 7, title: '아카이브 자료 관리', url: '/management/archive' },
      { id: 8, title: '교수 업적 관리', url: '/management/professor' },
    ],
  },
];
