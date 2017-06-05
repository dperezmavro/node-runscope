import Runscope from 'runscope'

class Environment extends Runscope {
  constructor(token, bucket_key) {
    super(token)
    this.bucketKey = bucket_key
    this.bucketName = undefined
  }

  generateListEnvironmentsUrl(tid) {
    return `/buckets/${this.bucketKey}/tests/${tid}/environments`
  }

  /**
  *   @see https://www.runscope.com/docs/api/environments#list
  */
  listEnvironments(testId) {
    return new Promise((acc, rej) => {
      this.get(
        this.generateListEnvironmentsUrl(testId)
      ).then(
        (data) => {
          acc(data.data)
        },
        rej
      )
    })
  }

  generateListSharedEnvironmentsUrl() {
    return `/buckets/${this.bucketKey}/environments`
  }

  /**
  * @see https://www.runscope.com/docs/api/environments#list-shared
  */
  listSharedEnvironments() {
    return new Promise((acc, rej) => {
      this.get(this.generateListSharedEnvironmentsUrl())
      .then(
        (data) => {
          acc(data.data)
        },
        rej
      )
    })
  }

  generateGetEnvironmentDetailsUrl(eid) {
    return `/buckets/${this.bucketKey}/environments/${eid}`
  }

  /**
  * @see https://www.runscope.com/docs/api/environments#detail
  */
  getEnvironmentDetails(envId) {
    return new Promise((acc, rej) => {
      this.get(
        this.generateGetEnvironmentDetailsUrl(envId)
      ).then(
        (data) => {
          acc(data.data)
        },
        rej
      )
    })
  }

  generateGetEnvironmentDetailsForTestUrl(tid, eid) {
    return `/buckets/${this.bucketKey}/tests/${tid}/environments/${eid}`
  }

  /**
  * @see https://www.runscope.com/docs/api/environments#detail
  */
  getEnvironmentDetailsForTest(testId, envId) {
    return new Promise((acc, rej) => {
      this.get(
        this.generateGetEnvironmentDetailsForTestUrl(testId, envId)
      ).then(
        (data) => {
          acc(data.data)
        },
        rej
      )
    })
  }
}

export default Environment
