const FEET_PER_METER = 3.281
const GALLONS_PER_LITER = 0.264
const POUNDS_PER_KILO = 2.204

const conversions = [
    {
        title: "Length (Meter/Feet)",
        conversionFactor: FEET_PER_METER,
        metricSingular: "meter",
        metricPlural: "meters",
        imperialSingular: "foot",
        imperialPlural: "feet",
    },
    {
        title: "Volume (Liters/Gallons)",
        conversionFactor: GALLONS_PER_LITER,
        metricSingular: "liter",
        metricPlural: "liters",
        imperialSingular: "gallon",
        imperialPlural: "gallons",
    },
    {
        title: "Mass (Kilograms/Pounds)",
        conversionFactor: POUNDS_PER_KILO,
        metricSingular: "kilo",
        metricPlural: "kilos",
        imperialSingular: "pound",
        imperialPlural: "pounds"
    }
]

const inputElem = document.getElementById("input-elem")
const convertBtn = document.getElementById("convert-btn")
const conversionInfoSection = document.getElementById("conversion-info-section")

convertBtn.addEventListener("click", handleConversion)
inputElem.addEventListener("focus", () => inputElem.select())

inputElem.value = "1"

handleConversion()

function handleConversion() {
    if (inputElem.value === "")
        return

    const numberOfUnits = Number(inputElem.value)

    if (isNaN(numberOfUnits) || numberOfUnits < 0) 
        return

    render(numberOfUnits)
}

function render(numberOfUnits) {
    let innerHTML = ""

    for (let i = 0; i < conversions.length; i++) {
        const metricUnitString = getUnitString(numberOfUnits, conversions[i].metricSingular, conversions[i].metricPlural)
        const imperialUnitString = getUnitString(numberOfUnits, conversions[i].imperialSingular, conversions[i].imperialPlural)
        const imperialValue = calculateValue(numberOfUnits, conversions[i].conversionFactor, true)
        const metricValue = calculateValue(numberOfUnits, conversions[i].conversionFactor, false)

        innerHTML += `
            <div class="conversion-info-container">
                <h2 class="measurement">${conversions[i].title}</h2>
                <div class="conversion">
                    <p>
                    ${numberOfUnits} ${metricUnitString} = ${imperialValue} ${conversions[i].imperialPlural} 
                    | 
                    ${numberOfUnits} ${imperialUnitString} = ${metricValue} ${conversions[i].metricPlural}
                    </p>
                </div>
            </div>  
        `
    }
    conversionInfoSection.innerHTML = innerHTML
}

function calculateValue(numberOfUnits, conversionFactor, isMetricToImperial) {
    return (numberOfUnits * (isMetricToImperial ? conversionFactor : 1 / conversionFactor)).toFixed(3)
}

function getUnitString(numberOfUnits, singular, plural) {
    return numberOfUnits === 1 ? singular : plural
}


