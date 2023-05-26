


# docker run -it --init -p 3000:3000 -v "$(pwd)/my_workspace:/home/workspace:cached" gitpod/openvscode-server





echo ""
echo "Bonjour!"
echo "=> run image:   1 (default)"
echo "=> build image: 2"
echo "=> full reset:  3"
echo ""

read USER_INPUT_MODE

case $USER_INPUT_MODE in
2)
  echo ""
  echo "selected: build image"
  echo ""
  docker build --tag 'my-own-vs-code-0-0-1' .
  ;;
3)
  echo ""
  echo "selected: full reset"
  echo ""
  # docker rm -v 'my-own-vs-code-0-0-1'
  # docker system prune --volumes -a
  # docker system prune
  docker container prune -f
  docker image prune -f
  docker volume prune -f
  sudo systemctl restart docker
  ;;
*)
  echo ""
  echo "selected: run image"
  echo ""
  docker run -it --init -p 3000:3000 -v "$(pwd)/my_workspace:/home/workspace:cached" 'my-own-vs-code-0-0-1'
  ;;
esac



# ms-python/python
# https://ms-vscode.gallery.vsassets.io/_apis/public/gallery/publisher/ms-vscode/extension/csharp/1.3.0/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage

# wget https://ms-python.gallery.vsassets.io/_apis/public/gallery/publisher/ms-vscode/extension/python/2023.8.0/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage

# https://lukasz-wronski.gallerycdn.vsassets.io/extensions/ms-python/python/2023.8.0/1492669004156/Microsoft.VisualStudio.Services.VSIXPackage



# https://open-vsx.org/extension/ms-python/python
