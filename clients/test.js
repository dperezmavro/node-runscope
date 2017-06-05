import Runscope from 'runscope'

class Test extends Runscope {
  constructor(token, bucket_key, test_id) {
    super(token)
    this.bucketKey = bucket_key
    this.testId = test_id
    this.testCount = 30
    this.data = undefined
    this.testList = undefined
  }

  generateBucketTestsUrl() {
    return `/buckets/${this.bucketKey}/tests`
  }

  generateTestDetailUrl() {
    return this.generateBucketTestsUrl() + `/${this.testId}`
  }

  generateTestResultsUrl() {
    return this.generateTestDetailUrl() + `/results?count=${this.testCount}`
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

  getLatestTestResults() {
    return new Promise((accept, reject) => {
      this.get(
        this.generateTestResultsUrl()
      ).then(
        ({data: {data}}) => {
          accept(data)
        },
        reject
      )
    })
  }

  createTestPostBody(name) {
    return {
      name
    }
  }

  createTest(testName) {
    var payload = this.createTestPostBody(testName)
    return this.instance.post(
      this.generateBucketTestsUrl(this.bucketKey),
      payload
    )
  }
}

export default Test
