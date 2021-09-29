import {resolve} from "path"
import {existsSync, readFileSync, writeFileSync} from "fs"
import {inc, ReleaseType} from 'semver'

interface Options {
	packageJsonFile?: string
	releaseType?: ReleaseType
	overwrite?: boolean
}

export function increment(options: Options = {}) {
	const {
		packageJsonFile = 'package.json',
		releaseType = 'patch',
		overwrite = true,
	} = options

	const pkgJsonFilePath = resolve(packageJsonFile)
	if (!existsSync(pkgJsonFilePath)) {
		console.error('package.json not exists:', pkgJsonFilePath)
		process.exit(1)
	}

	const pkgText = readFileSync(pkgJsonFilePath, 'utf-8')
	const pkgJson = JSON.parse(pkgText)
	const {version} = pkgJson
	console.log('current version:', version)
	const nextVersion = inc(version, releaseType)
	console.log('next version:', nextVersion)

	if (overwrite) {
		pkgJson.version = nextVersion
		writeFileSync(pkgJsonFilePath, JSON.stringify(pkgJson, null, '\t'))
		console.log('overwrite success!')
	}

	return nextVersion
}
