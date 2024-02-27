export default function PlaceImg({place,index=0,className=null}){
    if(!place.photos?.length){
        return ""
    }
    if(!className){
        className = 'object-cover'
    }
    return (
            <div>
                <img src={'https://booking-app-backend-ildl.onrender.com/uploads/'+place.photos[index]} alt={place.title} />
            </div>
        )
}