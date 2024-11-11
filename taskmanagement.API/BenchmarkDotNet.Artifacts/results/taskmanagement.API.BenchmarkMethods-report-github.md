```

BenchmarkDotNet v0.14.0, Windows 11 (10.0.26100.2161)
Intel Core i5-10210U CPU 1.60GHz, 1 CPU, 8 logical and 4 physical cores
.NET SDK 8.0.403
  [Host] : .NET 8.0.10 (8.0.1024.46610), X64 RyuJIT AVX2

IterationCount=1000  LaunchCount=1  WarmupCount=1  

```
| Method      | Mean | Error |
|------------ |-----:|------:|
| GetUserById |   NA |    NA |

Benchmarks with issues:
  BenchmarkMethods.GetUserById: Job-XHBWJR(IterationCount=1000, LaunchCount=1, WarmupCount=1)
