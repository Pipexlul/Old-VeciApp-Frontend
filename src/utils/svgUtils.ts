import ReactServer from "react-dom/server";

const tablerIconToSvg = (tablerIcon: React.ReactElement, color: string) => {
  const htmlStr = ReactServer.renderToString(tablerIcon)
    .replace(`fill="currentColor"`, `fill="${color}"`)
    .replace(`stroke="currentColor"`, `stroke="${color}"`);

  return htmlStr;
};

export { tablerIconToSvg };
