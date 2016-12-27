import { Version } from './Version'
import { VersionFlag } from './ShowingLine'

export class Versions {
  private versions: Array<Version> = []

  public getVersionId(versionFlags: Array<VersionFlag>): number {
    const newVersion = new Version(versionFlags)

    const matchingVersion = this.versions.find(version =>
      version.dimensions === newVersion.dimensions
      && version.imax === newVersion.imax
      && version.language === newVersion.language
      && version.specialShowing === newVersion.specialShowing)

    if (matchingVersion !== undefined) {
      return this.versions.indexOf(matchingVersion)
    }

    this.versions.push(newVersion)
    return this.versions.indexOf(newVersion)
  }
}