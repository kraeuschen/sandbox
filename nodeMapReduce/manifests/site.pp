$build_packages = [
    'build-essential',
    'libssl-dev',
    'libexpat1-dev',
    'libicu-dev'
]

Exec {
    path => "/bin:/sbin:/usr/bin:/usr/sbin"
}

class { "::nodejs": }

package { $build_packages:
    ensure  => $ensure,
    before  => Class["::nodejs"]
}

# Update packages
exec { '/opt/worker/ npm install':
    command => 'npm install',
    cwd     => '/opt/worker/',
    require => Class['nodejs'],
}