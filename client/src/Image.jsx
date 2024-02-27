export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://booking-app-yh1w.onrender.com/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }