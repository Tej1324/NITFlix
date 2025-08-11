Set-Location "C:\Users\Shiv\Desktop\Teja\NITFlix\public"
Write-Host "Starting NITFlix from: $(Get-Location)"
http-server -p 8080 -o
