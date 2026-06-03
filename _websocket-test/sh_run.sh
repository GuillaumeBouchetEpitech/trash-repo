

echo ""
echo "Build target?"
echo "=> watch:          1 (default)"
echo "=> build release:  2"
echo "=> build debug:    3"
echo "=> format:         4"

echo ""

read USER_INPUT_PLATFORM

case $USER_INPUT_PLATFORM in
2)
  echo ""
  echo "selected target: build release"
  echo ""

  npm run release
  ;;
3)
  echo ""
  echo "selected target: build debug"
  echo ""

  npm run debug
  ;;
4)
  echo ""
  echo "selected target: format"
  echo ""

  npm run format
  ;;
*)
  echo ""
  echo "selected target: watch"
  echo ""

  npm run watch
  ;;
esac
