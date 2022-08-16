export interface AppProps {

}

export interface AppState {
    showDupes: boolean,
    blinkieList: blinkie[],
    fields: {
        fileName: string,
        transcript: string,
        tags: string
    }
}

export interface blinkie {
    checksum: string,
    gif: string,
    height: number,
    name: string,
    page: string,
    tags: string[],
    transcriber: string,
    transcript: string,
    url_text: string,
    weight: number,
    width: number
}