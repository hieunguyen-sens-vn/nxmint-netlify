//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import MenuIcon from '_@shared/icons/MenuIcon';
import HeaderLogoIcon from '_@shared/icons/HeaderLogoIcon';

export default function Header() {
  return (
    <header
      className={classcat([
        'z-sticky sticky top-0',
        'h-[--header-height] bg-header-bg px-[--site-padding]',
        'grid auto-cols-max grid-flow-col items-center justify-between',
      ])}
    >
      <HeaderLogoIcon />
      <MenuIcon />
    </header>
  );
}
