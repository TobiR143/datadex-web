import { HomeIcon } from "../../icons/Icons.tsx"
import "../../styles/pokemon/ErrorContainer.css"

interface Error {
    message: string,
    status: number
}

export const ErrorContainer = ({ error } : { error: Error }) => {
    return (
        <div className="error-container">
            <p className="error-status">{error.status}</p>
            <p className="error-message">{error.message}</p>
            <a className="home-redirect" href='/'>
                <HomeIcon color='#cd5353' />
                Home
            </a>
        </div>
    )
}