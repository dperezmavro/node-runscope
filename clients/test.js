import Runscope from 'runscope'

class Test extends Runscope {
  constructor(token, bucket_key, test_id) {
    super(token)
    this.bucketKey = bucket_key
    this.testId = test_id
    this.bucketName = undefined
    this.data = undefined
    this.testList = undefined
  }

  generateTestDetailUrl() {
    return `/buckets/${this.bucketKey}/tests/${this.testId}`
  }

  /**
  *   @see https://www.runscope.com/docs/api/tests#detail
  */
  testDetail() {
    return new Promise((acc, rej) => {
      this.get(
        this.generateTestDetailUrl()
      ).then(
        (data) => {
          this.data = data.data
          acc(data.data)
        },
        rej
      )
    })
  }
}

export default Test
