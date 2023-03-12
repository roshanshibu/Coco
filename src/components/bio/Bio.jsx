import {useParams} from "react-router-dom"

const Bio = () => {
    const { artistId } = useParams()

    return (
        <p>Artist {artistId} Bio</p>
    )
}

export default Bio