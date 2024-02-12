import { ResponsiveBar } from '@nivo/bar';

const BarGraph = ({ data }: { data: { gdp: { country: string, year: number, amount: number }[] } }) => {
    const { gdp } = data;
    const yearMap: { [year: string]: { [country: string]: number } } = {};
    const countries = new Set<string>();
    for (const g of gdp) {
        if (!yearMap[g.year]) {
            yearMap[g.year] = { [g.country]: g.amount };
        } else {
            yearMap[g.year][g.country] = g.amount;
        }
        countries.add(g.country);
    }

    const barData = [];
    for (const year in yearMap) {
        barData.push({ ...yearMap[year], year});
    }

    return (
        <ResponsiveBar
            data={barData}
            keys={[...countries]}
            indexBy="year"
            margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
            padding={0.2}
            valueFormat=" >-$"
            valueScale={{ type: 'linear' }}
            animate={true}
            enableLabel={false}
            groupMode="grouped"
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
}

export default BarGraph;
