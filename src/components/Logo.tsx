import { useCopy } from '../i18n/useCopy'
import { ResponsiveImage } from './ResponsiveImage'

export function Logo() {
  const copy = useCopy()
  return <ResponsiveImage assetKey="logo" alt={copy.nav.logoAlt} sizes="40px" />
}
