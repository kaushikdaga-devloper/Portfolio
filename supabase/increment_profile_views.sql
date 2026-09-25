create or replace function public.increment_profile_views()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_value bigint;
begin
  update public.analytics
  set value = value + 1
  where "key" = 'portfolio_views'
  returning value into updated_value;

  if updated_value is null then
    insert into public.analytics ("key", value)
    values ('portfolio_views', 1)
    returning value into updated_value;
  end if;

  return updated_value;
end;
$$;

grant execute on function public.increment_profile_views() to anon, authenticated;
