import Runscope from 'runscope'

class Result extends Runscope {
  constructor(token, bucket_key, test_id, test_run_id) {
    super(token)
    this.bucketKey = bucket_key
    this.testId = test_id
    this.testRunId = test_run_id
  }

  generateTestResultDetailUrl() {
    return `/buckets/${this.bucketKey}/tests/${this.testId}/results/${this.testRunId}`
  }

  /**
  *   @see https://www.runscope.com/docs/api/results#test-run-detail
  */
  testResultDetail() {
    return new Promise((acc, rej) => {
      this.get(
        this.generateTestResultDetailUrl()
      ).then(data => acc(data.data), rej)
    })
  }
}

export default Result
