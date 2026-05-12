Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\totoj\Downloads\Telegram Desktop\IMG_8972.HEIC'
$dstFull = 'C:\Users\totoj\CascadeProjects\cinematic-portfolio\public\portrait.jpg'

if (-not (Test-Path 'C:\Users\totoj\CascadeProjects\cinematic-portfolio\public')) {
  New-Item -ItemType Directory -Force -Path 'C:\Users\totoj\CascadeProjects\cinematic-portfolio\public' | Out-Null
}

try {
  $img = [System.Drawing.Image]::FromFile($src)
  Write-Host "Loaded HEIC: $($img.Width) x $($img.Height)"

  # Resize to max 1400 on long edge while preserving aspect, then save as high-quality JPEG.
  $maxDim = 1400
  $w = $img.Width
  $h = $img.Height
  if ($w -ge $h) {
    $newW = [math]::Min($maxDim, $w)
    $newH = [int]([math]::Round($h * ($newW / $w)))
  } else {
    $newH = [math]::Min($maxDim, $h)
    $newW = [int]([math]::Round($w * ($newH / $h)))
  }

  $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.DrawImage($img, 0, 0, $newW, $newH)
  $g.Dispose()

  $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' } | Select-Object -First 1
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)
  $bmp.Save($dstFull, $jpegCodec, $params)

  Write-Host "Saved JPEG: $newW x $newH @ q88 -> $dstFull"
  $bmp.Dispose()
  $img.Dispose()
} catch {
  Write-Host "ERROR: $($_.Exception.Message)"
  exit 1
}
