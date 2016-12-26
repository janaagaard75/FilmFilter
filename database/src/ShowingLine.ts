type VersionFlag = '2D' | '3D' | 'IMAX 2D' | 'IMAX 3D' | 'dansk tale' | 'S\u00e6rvisning'

export interface ShowingLine {
  movieUrl: string
  showingUrl: string
  start: string
  theatherUrl: string
  versionFlags: Array<VersionFlag>
}