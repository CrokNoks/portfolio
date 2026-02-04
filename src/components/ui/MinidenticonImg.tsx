import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'

interface MinidenticonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  seed: string;
  saturation?: number;
  lightness?: number;
}

const MinidenticonImg = ({ seed, saturation = 50, lightness = 50, ...props }: MinidenticonProps) => {
  const svgURI = useMemo(
    () => `data:image/svg+xml;utf8,${minidenticon(seed, saturation, lightness)}`,
    [seed, saturation, lightness]
  )
  return (<img className='border rounded-full' src={svgURI} alt={seed} {...props} />)
}

export default MinidenticonImg;