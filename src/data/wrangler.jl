using DataFrames, CSV, JSON

df = CSV.read("TS045-2021-4.csv", DataFrame)

nocars = df[df[!,3] .== 0, :]
totals = combine(groupby(df, 1), 5 => sum => :total)
nocars2 = leftjoin(nocars[!, [1,5]], totals, on = Symbol("Lower tier local authorities Code")) 

nocars2.percentage = nocars2[!,2] ./ nocars2[!,3]

# Print to JSON as column 1 and 3 with each row being key: value
JSON.write("TS045-2021-4.json", JSON.json(Dict(k => v for (k, v) in zip(nocars2[!,1], nocars2[!,4]))))
