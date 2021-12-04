drop table if exists

	kydata.weatherdata_long_type;

create table

	kydata.weatherdata_long_type

as

select

	kydata.weatherdata_long.id,

	cast(kydata.weatherdata_long.fips as varchar),

	kydata.weatherdata_long.year,

	kydata.weatherdata_long.month,

	kydata.weatherdata_long.tmin,

	kydata.weatherdata_long.tmax,

	kydata.weatherdata_long.tavg,

	kydata.weatherdata_long.prec

from kydata.weatherdata_long;



alter table

	kydata.weatherdata_long_type

add primary key (id);



drop table if exists

	kydata.ky_weatherdata_long_geom;

create table

	kydata.ky_weatherdata_long_geom

as

select

	kydata.weatherdata_long_type.id,

	kydata.weatherdata_long_type.fips,

	kydata.weatherdata_long_type.year,

	kydata.weatherdata_long_type.month,

	kydata.weatherdata_long_type.tmin,

	kydata.weatherdata_long_type.tmax,

	kydata.weatherdata_long_type.tavg,

	kydata.weatherdata_long_type.prec,

	kydata.ky_county.geom,

	kydata.ky_county.name,

	kydata.ky_county.aland,

	kydata.ky_county.awater,
	
	kydata.ky_county.centroid_x,
	kydata.ky_county.centroid_y

from kydata.weatherdata_long_type

left join kydata.ky_county

on kydata.weatherdata_long_type.fips=kydata.ky_county.geoid;



alter table

	kydata.ky_weatherdata_long_geom

add primary key (id);