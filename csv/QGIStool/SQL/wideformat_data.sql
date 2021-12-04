select
	kydata.weatherdata_wide.id,
	cast(kydata.weatherdata_wide.fips as varchar),
	kydata.weatherdata_wide.*
from kydata.weatherdata_wide;
	