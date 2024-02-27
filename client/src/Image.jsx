export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://booking-app-2-gmzj.onrender.com/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }