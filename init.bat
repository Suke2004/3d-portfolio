npx -y create-next-app@latest portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
xcopy /E /I /H /Y portfolio .
rmdir /S /Q portfolio
npm install framer-motion clsx tailwind-merge
mkdir public
move sequence public\sequence
echo DONE > done.txt
