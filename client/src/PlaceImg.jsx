export default function PlaceImg({place,index=0,className=null}){
    if(!place.photos?.length){
        return ""
    }
    if(!className){
        className = 'object-cover'
    }
    return (
            <div>
                <img src={'https://booking-app-1-aqqh.onrender.com/uploads/'+place.photos[index]} alt={place.title} />
            </div>
        )
}