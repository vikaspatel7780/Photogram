const Card =(props)=>{
    return(
        <figure className="w-11/12  xl:w-30p mb-5 ">
                        <img className=" w-11/12 h-auto rounded border border-blue-900" src={props.url} alt="Image 1" />
                        <figcaption className=" text-2xl font-bold ">{props.name}</figcaption>
                    </figure>
    )
}

export default Card