import Runscope from 'runscope'

class Bucket extends Runscope {
  constructor(token, bucket_key) {
    super(token)
    this.bucketKey = bucket_key
    this.bucketName = undefined
    this.data = undefined
    this.testList = undefined
  }

  getBucketListUrl() {
    return "/buckets"
  }

  /**
   * Get a list of buckets.
   *
   * @see [Bucket List]{@link https://www.runscope.com/docs/api/buckets#bucket-list}
   * @returns {Array} Of Bucket objects.
   */
  bucketList() {
    return new Promise((acc, rej) => {
      this.get(
        this.getBucketListUrl()
      ).then(
        (resp) => {
          acc(resp.data)
        },
        rej
      )
    })
  }

  getBucketDetailsUrl(bucketKey) {
    return this.getBucketListUrl() + `/${bucketKey}`
  }

  /**
   * Get the details for bucketKeycurrent value of the tag.
   *
   * @param {string} bucketKey - Bucket Key to fetch
   *
   * @see [Bucket Detail]{@link https://www.runscope.com/docs/api/buckets#bucket-detail}
   * @returns {Object} Bucket Object.
   */
  bucketDetails(bucketKey) {
    this.bucketKey = bucketKey
    return new Promise((acc, rej) => {

      this.get(
        this.getBucketDetailsUrl(bucketKey)
      ).then(
        (data) => {
          this.bucketName = data.data.name
          this.data = data.data
          acc(data.data)
        },
        rej
      )
    })
  }

  generateTestListUrl(count) {
    return `/buckets/${this.bucketKey}/tests?count=${count || 30}`
  }
  /**
  * @see https://www.runscope.com/docs/api/tests#list
  */
  getTestList(count = 20) {
    return new Promise((acc, rej) => {
      this.get(
        this.generateTestListUrl(count)
      ).then(
        (data) => {
          this.testList = data.data
          acc(data.data)
        },
        rej
      )
    })
  }
}

export default Bucket
