declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.gif' {
  const content: React.FunctionComponent<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  export default content;
}
