import localFont from 'next/font/local'

export const pretendard = localFont({
    src: [
      {
        path: '../../../public/fonts/PretendardVariable.woff2',  // public 폴더 기준
        weight: '45 920',
        style: 'normal',
      }
    ],
    variable: '--font-pretendard',
    display: 'swap',
  })