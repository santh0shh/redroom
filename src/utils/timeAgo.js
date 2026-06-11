export function formatTimeAgo(timestamp, now = Date.now()) {
  const ms = Number(timestamp)

  if (!Number.isFinite(ms)) {
    return 'just now'
  }

  const seconds = Math.floor((now - ms) / 1000)

  if (!Number.isFinite(seconds) || seconds < 10) {
    return 'just now'
  }
  if (seconds < 60) {
    const bucket = Math.floor(seconds / 10) * 10
    return `${bucket} secs ago`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} min${minutes === 1 ? '' : 's'} ago`
  }

  const hours = Math.floor(minutes / 60)
  return `${hours} hr${hours === 1 ? '' : 's'} ago`
}

export function secondsAgo(secs) {
  return Date.now() - secs * 1000
}

export function minutesAgo(mins) {
  return Date.now() - mins * 60 * 1000
}

export function getNextTimeBoundary(timestamp, now = Date.now()) {
  const ms = Number(timestamp)
  if (!Number.isFinite(ms)) return null

  const seconds = Math.floor((now - ms) / 1000)

  if (seconds < 60) {
    const nextBucket = (Math.floor(seconds / 10) + 1) * 10
    return ms + nextBucket * 1000
  }

  const minsElapsed = Math.floor(seconds / 60)
  return ms + (minsElapsed + 1) * 60000
}
