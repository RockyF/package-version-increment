#!/usr/bin/env node

const [, , releaseType, packageJsonFile] = process.argv

import {increment} from './index'

increment({
	releaseType: releaseType as any,
	packageJsonFile,
})
