import Runscope from 'runscope'

class Team extends Runscope {
  constructor(token) {
    super(token)
    this.data = undefined
  }

  getTeamsMemberListUrl(teamId) {
    return `/teams/${teamId}/people`
  }

  /**
  * @see [Teams Resource]{@link https://www.runscope.com/docs/api/teams}
  */
  teamMembersList(teamId) {
    return new Promise((acc, rej) => {
      this.get(
        this.getTeamsMemberListUrl(teamId)
      ).then(
        (data) => {
          this.data = data
          acc(data)
        },
        rej
      )
    })
  }
}

export default Team
