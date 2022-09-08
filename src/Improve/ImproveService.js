import * as Constants from '../Constants'

class ImproveService {

    static getFilteredDataSet = (data, gameMode, buildOrder, civ, map) => { //ToDo: Filter for game mode
        const sortedData = data.sort((a, b) => (a.played_at_time > b.played_at_time) ? 1 : -1)
        const filteredData = sortedData.filter(g => g.players[Constants.OfficialAccountDemoProfileId] !== undefined && (buildOrder === Constants.Build.Any || g.players[Constants.OfficialAccountDemoProfileId].build === buildOrder) && (civ === Constants.Civ.Any || g.players[Constants.OfficialAccountDemoProfileId].civ === civ) && (map === Constants.Map.Any || g.map_name === map))
        return filteredData
    }

    static getBuildOrderOptionsFromDataSet = (data) => {
        const allBuildTypes = data.map(g => g.players[Constants.OfficialAccountDemoProfileId].build)
        const dataWithoutDuplicates = [...new Set(allBuildTypes)]
        const buildTypes = dataWithoutDuplicates.map(g => { return { value: g, label: g } })
        buildTypes.push({ value: Constants.Build.Any, label: Constants.Build.Any })
        return buildTypes
    }

    static getMapOptionsFromDataSet = (data) => {
        const allMaps = data.map(g => g.map_name)
        const dataWithoutDuplicates = [...new Set(allMaps)]
        const maps = dataWithoutDuplicates.map(g => { return { value: g, label: g } })
        maps.push({ value: Constants.Map.Any, label: Constants.Map.Any })
        return maps
    }

    static getCivOptionsFromDataSet = (data) => {
        const allCivs = data.map(g => g.players[Constants.OfficialAccountDemoProfileId].civ)
        const dataWithoutDuplicates = [...new Set(allCivs)]
        const civs = dataWithoutDuplicates.map(g => { return { value: g, label: g } })
        civs.push({ value: Constants.Civ.Any, label: Constants.Civ.Any })
        return civs
    }

    static getGameModeOptionsFromDataSet = (data) => {
        return [{ value: Constants.GameMode.Any, label: Constants.GameMode.Any }] // ToDo: Get game mode from data
    }

    static getGEAPMFromData = (data) => {
        return data.map(g => { return { 'valueXAxis': this.toDate(g.played_at_time), 'valueYAxis': g.players[Constants.OfficialAccountDemoProfileId].mean_apm } })
    }

    static getFeudalAgeUptimeFromData = (data) => {
        return data.map(g => { return { 'valueXAxis': this.toDate(g.played_at_time), 'valueYAxis': g.players[Constants.OfficialAccountDemoProfileId].age_up_times['feudal'] } })
    }

    static getCastleAgeUptimeFromData = (data) => {
        return data.map(g => { return { 'valueXAxis': this.toDate(g.played_at_time), 'valueYAxis': g.players[Constants.OfficialAccountDemoProfileId].age_up_times['castle'] } })
    }

    static getImperialAgeUptimeFromData = (data) => {
        return data.map(g => { return { 'valueXAxis': this.toDate(g.played_at_time), 'valueYAxis': g.players[Constants.OfficialAccountDemoProfileId].age_up_times['imperial'] } })
    }

    static toDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
    }
}

export default ImproveService