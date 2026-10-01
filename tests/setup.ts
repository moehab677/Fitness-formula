import '@testing-library/jest-dom/vitest'
import en from '../src/data/copy/en.json'
import ar from '../src/data/copy/ar.json'
import { registerCopy } from '../src/i18n/useCopy'

registerCopy('en', en)
registerCopy('ar', ar)
