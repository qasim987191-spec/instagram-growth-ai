mkdir -p public/assets
convert -size 512x512 xc:'#0B0C10' \
  -fill '#E1306C' -draw 'roundrectangle 40,40,472,472,110,110' \
  -fill '#833AB4' -draw 'roundrectangle 60,60,452,452,100,100' \
  -fill '#FD1D1D' -draw 'roundrectangle 90,90,422,422,90,90' \
  -fill '#F77737' -draw 'roundrectangle 120,120,392,392,80,80' \
  -fill none -stroke white -strokewidth 24 -draw 'roundrectangle 150,150,362,362,60,60' \
  -fill none -stroke white -strokewidth 24 -draw 'circle 256,256,256,310' \
  -fill white -stroke none -draw 'circle 325,185,325,195' \
  public/assets/icon-512.png

convert public/assets/icon-512.png -resize 192x192 public/assets/icon-192.png
convert public/assets/icon-512.png -resize 512x512 public/assets/icon.png
