# SciPy and Cephes

Some statistic functions, like the ppf (percent point function) of the normal distribution in the file `src/utils/stats.ts` are converted from the **SciPy** Python package, licenced under the **BSD 3-Clause** ([LICENSE](https://github.com/scipy/scipy/blob/master/LICENSE.txt)). And the **SciPy** uses the **Cephes Math Library**, converted to TypeScript here for this use.

Is planed, to the future, remove this references from **SciPy** and **Cephes** and create my own functions to do this things.
