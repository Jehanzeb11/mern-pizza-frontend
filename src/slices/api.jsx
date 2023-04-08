export const uri = "https://average-gown-eel.cyclic.app/api"



export const setHeaders = () => {
    const headers = {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        },
    }

    return headers

}