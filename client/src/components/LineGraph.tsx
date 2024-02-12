import { ResponsiveLine } from "@nivo/line"

const LineGraph = ({ data }: { data: { gdp: { country: string, year: number, amount: number }[] } }) => {
    const { gdp } = data;
    const countryMap: { [key: string]: { country: string, year: number, amount: number }[] } = {};
    for (const g of gdp) {
        if (!countryMap[g.country]) {
        countryMap[g.country] = [];
        }
        countryMap[g.country].push(g);
    }

    const lineData = [];
    for (const country in countryMap) {
        lineData.push({
        id: country,
        data: [...countryMap[country]].sort((a, b) => a.year - b.year).map(g => ({ x: g.year, y: g.amount }))
        });
    }

    return (
        <ResponsiveLine
            data={lineData}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            yFormat=" >-$"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Year',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};

export default LineGraph;
