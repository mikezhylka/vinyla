type Props = {
  apiKey: string;
  text: string;
  className: string;
};

export const productCharsBarTitles: Props[] = [
  {
    apiKey: "numberOfMedia",
    text: "Number of media",
    className: "number-of-media",
  },
  
  {
    apiKey: "genre",
    text: "Genres",
    className: "genres",
  },
  
  {
    apiKey: "label",
    text: "Label",
    className: "label",
  },
  
  {
    apiKey: "barcode",
    text: "Barcode",
    className: "barcode",
  },
];