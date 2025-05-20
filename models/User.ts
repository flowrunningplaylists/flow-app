export default class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public strava_auth_code: string | null = null,
    public spotify_auth_code: string | null = null,
  ) {}

  get isFullyConnected(): boolean {
    return !!this.strava_auth_code && !!this.spotify_auth_code;
  }

  static fromJSON(json: any): User {
    return new User(
      json.id,
      json.email,
      json.name,
      json.strava_auth_code,
      json.spotify_auth_code
    );
  }
}
