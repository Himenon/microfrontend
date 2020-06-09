import { run, Props } from "./";

const props: Props = {
  tutorial: {
    steps: [
      {
        title: "chapter 1",
        thumbnailSrc: "https://www.gstatic.com/webp/gallery/1.jpg",
        description: "chapter 1 description",
      },
      {
        title: "chapter 2",
        thumbnailSrc: "https://www.gstatic.com/webp/gallery/2.jpg",
        description: "chapter 2 description",
      },
      {
        title: "chapter 3",
        thumbnailSrc: "https://www.gstatic.com/webp/gallery/3.jpg",
        description: "chapter 3 description",
      },
      {
        title: "chapter 4",
        thumbnailSrc: "https://www.gstatic.com/webp/gallery/4.jpg",
        description: "chapter 4 description",
      },
      {
        title: "chapter 5",
        thumbnailSrc: "https://www.gstatic.com/webp/gallery/5.jpg",
        description: "chapter 5 description",
      },
    ],
  },
};

const main = () => {
  const element = document.getElementById("root");
  if (!element) {
    return;
  }
  run(element, props);
};

main();
